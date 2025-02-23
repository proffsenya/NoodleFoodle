using NoodlefoodleStore.Domain.Exceptions;

namespace NoodlefoodleStore.Domain.ValueObjects
{
    public record DishId
    {
        public Guid Value { get; }

        public DishId(Guid value)
        {
            this.Value = value;
        }

        public static DishId Of(Guid value)
        {
            if(value == Guid.Empty)
            {
                throw new DomainExceptions("DishId не может быть пустым.");
            }
            return new DishId(value);
        }
    }
}
