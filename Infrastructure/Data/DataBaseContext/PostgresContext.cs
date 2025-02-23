

namespace NoodlefoodleStore.Infrastructure.Data.DataBaseContext;

public partial class PostgresContext : DbContext
{
    public PostgresContext()
    {
    }

    public PostgresContext(DbContextOptions<PostgresContext> options)
        : base(options)
    {
    }

    

   
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        
    }

    
}
