namespace _03BarracksFactory.Core.Factories
{
    using System;
    using Contracts;

    public class UnitFactory : IUnitFactory
    {
        public IUnit CreateUnit(string unitType)
        {
            Type classType = Type.GetType($"_03BarracksFactory.Models.Units.{unitType}");

            IUnit instance = (IUnit)Activator.CreateInstance(classType);
            
            return instance;
        }
    }
}
