using System.ComponentModel.DataAnnotations;

namespace CustodianPlc.Attribute
{
  public class ImageSizeValidationAttribute : ValidationAttribute
  {
    public ImageSizeValidationAttribute(string errorMessage) : base(errorMessage)
    {

    }
    public override bool IsValid(object? value)
    {
      if (value != null)
      {
        var image = (IFormFile)value;
        if ((int)image.Length <= 1005837)
        {
          return true;
        }
      };

      return false;
    }
  }
}
