using System.Collections.Generic;
using System.Linq;
using P08_Military_Elite.Model.Privates;
using P08_Military_Elite.Model.Privates.SpecialisedSoldiers;

namespace P08_Military_Elite
{
    using System;
    using Model;

    public class Program
    {
        public static void Main()
        {
            List<Soldier> soldiers = new List<Soldier>();

            string soldier = Console.ReadLine();
            
            while (soldier != "End")
            {
                string[] soldierArgs = soldier
                    .Split();

                string soldierType = soldierArgs[0];
                string id = soldierArgs[1];
                string firstName = soldierArgs[2];
                string lastName = soldierArgs[3];

                if (soldierType == "Private")
                {
                    decimal salary = decimal.Parse(soldierArgs[4]);

                    Private @private = new Private(id, firstName, lastName, salary);

                    soldiers.Add(@private);
                }
                else if (soldierType == "Spy")
                {
                    int codeNumber = int.Parse(soldierArgs[4]);

                    Spy spy = new Spy(id, firstName, lastName, codeNumber);

                    soldiers.Add(spy);
                }
                else if (soldierType == "LieutenantGeneral")
                {
                    decimal salary = decimal.Parse(soldierArgs[4]);

                    List<string> ids = soldierArgs.Skip(5).ToList();

                    List<Private> privates = GetPrivates(ids, soldiers); 

                    LieutenantGeneral lieutenantGeneral = new LieutenantGeneral(id, firstName, lastName, salary, privates);

                    soldiers.Add(lieutenantGeneral);
                }
                else if (soldierType == "Engineer")
                {
                    decimal salary = decimal.Parse(soldierArgs[4]);
                    string corps = soldierArgs[5];

                    List<string> repairArgs = soldierArgs.Skip(6).ToList();

                    List<Repair> repairs = GetRepairs(repairArgs);

                    try
                    {
                        Engineer engineer = new Engineer(id, firstName, lastName, salary, corps, repairs);

                        soldiers.Add(engineer);
                    }
                    catch (Exception)
                    {
                    }
                }
                else if (soldierType == "Commando")
                {
                    decimal salary = decimal.Parse(soldierArgs[4]);
                    string corps = soldierArgs[5];

                    List<string> missionArgs = soldierArgs.Skip(6).ToList();

                    List<Mission> missions = GetMissions(missionArgs);

                    try
                    {
                        Commando commando = new Commando(id, firstName, lastName, salary, corps, missions);

                        soldiers.Add(commando);
                    }
                    catch (Exception)
                    {
                    }
                }

                soldier = Console.ReadLine();
            }

            foreach (var soldierObject in soldiers)
            {
                Console.WriteLine(soldierObject);
            }
        }

        private static List<Mission> GetMissions(List<string> missionArgs)
        {
            List<Mission> missions = new List<Mission>();

            for (int i = 0; i < missionArgs.Count; i += 2)
            {
                string partName = missionArgs[i];
                string state = missionArgs[i + 1];

                try
                {
                    Mission mission = new Mission(partName, state);

                    missions.Add(mission);
                }
                catch (Exception)
                {
                }
            }

            return missions;
        }

        private static List<Repair> GetRepairs(List<string> repairArgs)
        {
            List<Repair> repairs = new List<Repair>();

            for (int i = 0; i < repairArgs.Count; i+=2)
            {
                string partName = repairArgs[i];
                int hoursWorked = int.Parse(repairArgs[i + 1]);

                Repair repair = new Repair(partName, hoursWorked);

                repairs.Add(repair);
            }

            return repairs;
        }

        private static List<Private> GetPrivates(List<string> ids, List<Soldier> soldiers)
        {
            List<Private> privates = new List<Private>();

            List<Soldier> filteredSoldiers = soldiers.Where(x => x.GetType().Name == nameof(Private)).ToList();

            foreach (var privatesSoldier in filteredSoldiers)
            {
                if (ids.Contains(privatesSoldier.Id))
                {
                    privates.Add((Private)privatesSoldier);
                }
            }
            
            return privates;
        }
    }
}