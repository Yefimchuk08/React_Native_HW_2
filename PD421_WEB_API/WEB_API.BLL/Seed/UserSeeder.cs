using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using WEB_API.BLL.Dtos.User;
using WEB_API.DAL.Entities.Identity;

namespace WEB_API.BLL.Seed;

public static class UserSeeder
{
    public static async Task SeedUsersAsync(
        UserManager<UserEntity> userManager,
        RoleManager<RoleEntity> roleManager)
    {
        if (userManager.Users.Any())
            return;

        var json = await File.ReadAllTextAsync("SeedData/users.json");

        var users = JsonSerializer.Deserialize<List<SeedUserDTO>>(json);

        foreach (var item in users)
        {
            var user = new UserEntity
            {
                Email = item.Email,
                UserName = item.Email,
                FirstName = item.FirstName,
                LastName = item.LastName,
                Image = item.Image
            };

            var result = await userManager.CreateAsync(user, item.Password);

            if (result.Succeeded)
            {
                foreach (var role in item.Roles)
                {
                    if (!await roleManager.RoleExistsAsync(role))
                        await roleManager.CreateAsync(new RoleEntity(role));

                    await userManager.AddToRoleAsync(user, role);
                }
            }
        }
    }
}