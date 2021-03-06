from django.http import JsonResponse
from django.shortcuts import render, redirect
from .forms import SearchForm
from .utils import capitalize_phrase, sanitize_phrase
from .score_fetcher import ScoreFetcher


# Create your views here.


def homepage(request):
    template = "search.html"
    form = SearchForm()

    context = {'form': form}
    return render(request, template, context)


def scoreboard(request):
    search_term = request.POST.get('search')
    template = "scoreboard.html"

    try:
        capitalized_search_term = capitalize_phrase(search_term)
        sanitized_search_term = sanitize_phrase(search_term)
        print(sanitized_search_term)
    except AttributeError:
        return redirect("media_ratings:home")

    context = {
        "media_title": capitalized_search_term,
        "search_term": sanitized_search_term
    }
    return render(request, template, context)


def fetch_score_data(request):
    search_term = request.GET.get("media")

    score_fetcher = ScoreFetcher(search_term)
    score_data = score_fetcher.get_score_data()
    return JsonResponse(score_data)
