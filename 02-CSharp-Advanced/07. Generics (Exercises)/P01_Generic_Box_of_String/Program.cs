namespace P01_Generic_Box_of_String
{
    using System;

    public class Program
    {
        static void Main()
        {
            int numberOfLines = int.Parse(Console.ReadLine());

            for (int i = 0; i < numberOfLines; i++)
            {
                string content = Console.ReadLine();

                Box<string> box = new Box<string>(content);

                Console.WriteLine(box.ToString());
            }
        }
    }
}
