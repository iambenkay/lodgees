from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, Http404, JsonResponse
from .models import *
from django.db import models
from django.contrib import auth
from django.urls import reverse
import re
from django.db.utils import IntegrityError
from .search import find as advanced_search
import random


# Create your views here.


def about(request):
    return render(request, 'about.html')


def contact(request):
    return render(request, 'contact.html')


def index(request):
    for z in Zone.objects.annotate(counting=models.Count('lodges')):
        z.count = z.counting
        z.save()
    for z in Zone.objects.annotate(minimum=models.Min('lodges__price')):
        z.base_price = z.minimum
        z.save()
    context = {
        "zones": random.sample(list(Zone.objects.all()), 3) if len(Zone.objects.all()) > 3 else Zone.objects.all(),
        "lodges": Lodge.objects.all().order_by("price")[0:8:-1],
        "user": request.user,
    }
    return render(request, 'index.html', context)


def search(request):
    context = {
        "lodges": [],
        "message": "Type your search query",
    }
    if "val" in request.GET:
        if request.GET["val"] == 'zone':
            for z in Zone.objects.all():
                if advanced_search(request.GET["zone"], z.name) or re.search(request.GET["zone"], z.name) or re.search(z.name, request.GET["zone"]):
                    context["lodges"] += Lodge.objects.all().filter(zone=z)
            context["message"] = "'%s' did not match any lodge!" % request.GET['zone']
        elif request.GET["val"] == 'lodge':
            for l in Lodge.objects.all():
                if advanced_search(request.GET["lodge"], l.name) or re.search(request.GET["lodge"], l.name) or re.search(l.name, request.GET["lodge"]):
                    context["lodges"] += Lodge.objects.all().filter(name=l.name)
            context["message"] = "'%s' did not match any lodge!" % request.GET['lodge']

    return render(request, "search.html", context)


def offers(request):
    context = {
        "lodges": Lodge.objects.all(),
        "user": request.user,
    }
    return render(request, 'offers.html', context)


def offers_per_zone(request, id):
    context = {
        "lodges": Lodge.objects.all().filter(zone=Zone.objects.get(id=id)),
        "user": request.user,
    }
    return render(request, 'offers.html', context)


def listing(request, lodge_id):
    context = {
        "lodge": Lodge.objects.get(id=lodge_id),
        "interested": True if request.user in Lodge.objects.get(id=lodge_id).applicants.all() else False,
        "user": request.user,
    }
    try:
        context["already_interested"] = True if len(request.user.interests.all()) > 0 and Lodge.objects.get(
            id=lodge_id) not in request.user.interests.all() else False
    except AttributeError:
        context["already_interested"] = False

    return render(request, 'single_listing.html', context)


def dashboard_payment(request, t_id):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    context = {
        "t": Transaction.objects.get(pk=t_id)
    }
    # if context["lodge"] not in request.user.interests.all():
    #     return HttpResponseRedirect("/dashboard")

    return render(request, 'dashboard-payment.html', context)


def print_receipt(request,t_id):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
        

    context = {}

    if request.method == "POST":
        t = Transaction.objects.get(pk=t_id)
        if t.status == True:
            context["t"] = t
            return render(request, "receipt.html", context)
        else:
            return HttpResponseRedirect("/dashboard")

def login(request):
    context = {
        "next": "/" if "next" not in request.GET else "%s" % request.GET['next'],
    }
    if request.method == "POST":
        username = request.POST["username"].lower()
        password = request.POST["password"]

        user = auth.authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                auth.login(request, user)
                return HttpResponseRedirect(request.GET["next"] if "next" in request.GET else "/dashboard")
            else:
                context["error"] = "your account has been disabled"
                return render(request, "login.html", context)
        else:
            try:
                alt_user = auth.authenticate(username=User.objects.get(email=username).username, password=password)
                if alt_user.is_active:
                    auth.login(request, alt_user)
                    return HttpResponseRedirect(request.GET["next"] if "next" in request.GET else "/dashboard")
            except Profile.DoesNotExist:
                context["error"] = "Invalid username, email or password"
                return render(request, "login.html", context)
            except User.DoesNotExist:
                context["error"] = "Invalid username, email or password"
                return render(request, "login.html", context)

    if request.user.is_authenticated and request.user.is_active:
        return HttpResponseRedirect(request.GET["next"] if "next" in request.GET else "/dashboard")
    return render(request, "login.html", context)


def all_zones(request):
    return render(request, "all_zones.html", { "zones": Zone.objects.all() })

def logout(request):
    if request.user.is_active and request.user.is_authenticated:
        auth.logout(request)
        return HttpResponseRedirect(reverse("login"))
    return HttpResponseRedirect(reverse("index"))


def dashboard(request):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    context = {
        "user": request.user,
    }
    return render(request, "dashboard-index.html", context)


def dashboard_pages_profile(request):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    context = {
        "user": request.user,
        "profile": Profile.objects.get(user=request.user)
    }
    return render(request, "dashboard-pages-profile.html", context)


def dashboard_pages_transaction(request):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    context = {
        "user": request.user,
    }
    return render(request, "dashboard-pages-transaction.html", context)


def signup(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        firstname = request.POST["firstname"]
        lastname = request.POST["lastname"]
        password = request.POST["password"]
        phone = request.POST["phone"]

        try:
            user = User.objects.create_user(username=username.lower(), email=email.lower(), password=password)
        except IntegrityError:
            return render(request, "signup.html", { "errors": "Username has already been taken" })
        try:
            profile = Profile(user=user, phone=phone, firstname=firstname, lastname=lastname, email=email.lower())
            profile.save()
        except IntegrityError:
            user.delete()
            return render(request,"signup.html", { "errors": "Email has already been taken" })
        return HttpResponseRedirect(reverse("login"))

    return render(request, "signup.html")


def interested(request, lodge_id):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    user = request.user
    if len(user.interests.all()) > 0:
        user.interests.all()[0].applicants.remove(user)
    l = Lodge.objects.get(pk=lodge_id)
    l.applicants.add(user)
    l.save()
    return HttpResponseRedirect(reverse("listing", args=(lodge_id,)))


def book(request, id):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    try:
        t = Transaction(user=request.user, lodge=Lodge.objects.get(pk=id))
        t.save()
        for l in request.user.interests.all():
            request.user.interests.remove(l)

    except Lodge.DoesNotExist:
        return HttpResponseRedirect("/dashboard")
    return HttpResponseRedirect("/dashboard")


def uninterested(request, lodge_id):
    if not request.user.is_authenticated and not request.user.is_active:
        return HttpResponseRedirect("/login?next=%s" % request.path)
    user = request.user
    l = Lodge.objects.get(pk=lodge_id)
    l.applicants.remove(user)
    l.save()
    return HttpResponseRedirect(reverse("listing", args=(lodge_id,)))