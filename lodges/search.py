def find(query, option):
    query, option = set(list(query.lower())), set(list(option.lower()))
    if len(query & option) > len((query | option))/2:
        return True
    else:
        return False
