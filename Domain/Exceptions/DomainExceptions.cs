namespace NoodlefoodleStore.Domain.Exceptions
{
    public class DomainExceptions : Exception { public DomainExceptions(string message) : base($"Domain exception: {message}")
        {

        }
    }
}
