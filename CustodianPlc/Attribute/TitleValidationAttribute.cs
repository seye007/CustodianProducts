using System.ComponentModel.DataAnnotations;

namespace CustodianPlc.Attribute
{
  public class TitleValidationAttribute : ValidationAttribute
  {
    public TitleValidationAttribute(string errorMessage) : base(errorMessage)
      {

      }
      public override bool IsValid(object? value)
      {
        if (value != null)
        {
          var title = (string)value;
          if (string.IsNullOrEmpty(title))
          {
            return false;
          }
        };
        return true;
      }
    }
  }
