from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('contact', views.contact, name="contact"),
    path('about', views.about, name="about"),
    path('offers/<int:id>', views.offers_per_zone, name="offers_zone"),
    path('<int:lodge_id>/details', views.listing, name="listing"),
    path('search', views.search, name="search"),
    path('offers', views.offers, name="offers"),
    path('signup', views.signup, name="signup"),
    path('login', views.login, name="login"),
    path('logout', views.logout, name="logout"),
    path('dashboard', views.dashboard, name="dashboard"),
    path('dashboard/<int:t_id>/payment', views.dashboard_payment, name="dashboard-payment"),
    path('dashboard/profile', views.dashboard_pages_profile, name="dashboard-pages-profile"),
    path('dashboard/transaction', views.dashboard_pages_transaction, name="dashboard-pages-transaction"),
    path('interested/<int:lodge_id>', views.interested, name="interested"),
    path('uninterested/<int:lodge_id>', views.uninterested, name="uninterested"),
    path('book/<int:id>', views.book, name="book"),
    path('zones', views.all_zones, name="zones"),
    path('dashboard/<int:t_id>/print-receipt', views.print_receipt, name="receipt"),
]