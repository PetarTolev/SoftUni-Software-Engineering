namespace Facade
{
    using System;

    public class Bank
    {
        public bool HasSufficientSavings(Student c, int amount)
        {
            Console.WriteLine("Verify bank for " + c.Name);
            return true;
        }
    }
}