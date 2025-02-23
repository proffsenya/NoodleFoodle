namespace NoodlefoodleStore.Domain.Abstractions
{
    //для всех сущностей типа Entity будет обязателен собственный id
    public abstract class Entity<T> : IEntity<T>
    {
        public required T Id { get; set; }
    }
}
