namespace Even_Times
{
    using System;
    using System.Collections.Generic;

    class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());

            Dictionary<int, int> nums = new Dictionary<int, int>();

            for (int i = 0; i < n; i++)
            {
                int num = int.Parse(Console.ReadLine());

                if (nums.ContainsKey(num))
                {
                    nums[num]++;
                }
                else
                {
                    nums.Add(num, 1);
                }
            }

            foreach (var num in nums)
            {
                if (num.Value % 2 == 0)
                {
                    Console.WriteLine(num.Key);
                }
            }
        }
    }
}
