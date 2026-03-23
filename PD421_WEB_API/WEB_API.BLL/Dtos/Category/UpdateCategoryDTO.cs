using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace WEB_API.BLL.Dtos.Category
{
    public class UpdateCategoryDTO
    {
        public required String Id { get; set; }
        public String? Name { get; set; }

        public String? Description { get; set; }

        public IFormFile? Image { get; set; } = null;

    }
}
