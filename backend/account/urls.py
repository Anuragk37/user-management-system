from django.urls import path
from .views import *
UserLoginView
urlpatterns = [
    path('users/', UserListCreateView.as_view(), name='user-detail-list-create'),
    path('users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail-retrieve-update-destroy'),
    path('signup/', CreateUser.as_view()),
    path('signin/', UserLoginView.as_view()),
    path('admin-signin/', AdminLoginView.as_view()),
    path('connectivity/', ConnectivityView.as_view()),
    path('connectivity/<int:id>', ConnectivityView.as_view()),
    path('connectivity/', ConnectivityView.as_view()),
    
]
