﻿using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Exstensions
    {
        public static void AddAplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Controle-Allow-orgin", "*");
        }
    }
}
