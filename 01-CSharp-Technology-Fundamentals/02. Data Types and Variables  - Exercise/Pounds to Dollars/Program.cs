﻿using System;

namespace Pounds_to_Dollars
{
    class Program
    {
        static void Main(string[] args)
        {
            decimal pounds = decimal.Parse(Console.ReadLine());

            decimal dollars = pounds * 1.31m;
            Console.WriteLine($"{dollars:F3}");
        }
    }
}
