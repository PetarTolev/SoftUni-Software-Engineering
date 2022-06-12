﻿namespace SharedTrip.Controllers
{
    using InputModels.Users;
    using Services.UsersService;
    using SIS.HTTP;
    using SIS.MvcFramework;

    public class UsersController : Controller
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }

        public HttpResponse Login()
        {
            if (this.IsUserLoggedIn())
            {
                return this.Error("You are already logged in!");
            }

            return this.View();
        }

        [HttpPost]
        public HttpResponse Login(string username, string password)
        {
            if (this.IsUserLoggedIn())
            {
                return this.Error("You are already logged in!");
            }

            var userId = this.usersService.GetUserId(username, password);

            if (userId == null)
            {
                this.Redirect("Login");
            }

            this.SignIn(userId);

            return this.Redirect("/Trips/All");
        }

        public HttpResponse Logout()
        {
            if (!this.IsUserLoggedIn())
            {
                return this.Error("Not Logged In!");
            }

            this.SignOut();

            return this.Redirect("/");
        }

        public HttpResponse Register()
        {
            if (this.IsUserLoggedIn())
            {
                return this.Error("You are already logged in!");
            }

            return this.View();
        }

        [HttpPost]
        public HttpResponse Register(UsersRegisterInputModel input)
        {
            if (this.IsUserLoggedIn())
            {
                return this.Error("You are already logged in!");
            }

            if (input.Password.Length < 6 || input.Password.Length > 20 ||
                input.Password != input.ConfirmPassword ||
                input.Username.Length < 5 || input.Username.Length > 20 ||
                input.Username == null || input.Email == null ||
                this.usersService.IsEmailUsed(input.Email) ||
                this.usersService.IsUserNameUsed(input.Username))
            {
                return this.Redirect("Register");
            }

            this.usersService.CreateUser(input);

            return this.Redirect("Login");
        }
    }
}
