using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NoodleFoodle.Models;

namespace NoodleFoodle;

public partial class Test1Context : DbContext
{
    public Test1Context()
    {
    }

    public Test1Context(DbContextOptions<Test1Context> options)
        : base(options)
    {
    }
    public DbSet<Client> Client { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
      => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=test1;Username=postgres;Password=");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

        modelBuilder.ApplyConfiguration(new ClientCOnfiguration());
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    
}


public class ClientCOnfiguration : IEntityTypeConfiguration<Client>
{
    public void Configure(EntityTypeBuilder<Client> builder)
    {
        builder.HasKey(x => x.Id);
    }
}