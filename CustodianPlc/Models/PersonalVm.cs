using System.ComponentModel.DataAnnotations;

namespace CustodianPlc.Models
{
	public abstract class PersonalVm 
	{
    [Required(ErrorMessage = "Please Select a title")]
    public string Title { get; set; }
    [Required(ErrorMessage = "First name is required")]
    public string FirstName { get; set; }
    [Required(ErrorMessage = "Surname is required")]
    public string Surname { get; set; }
    [Required(ErrorMessage = "Company name is required")]
    public string CompanyName { get; set; }
    [Required(ErrorMessage = "Email is required")]
    public string Email { get; set; }
    [Required(ErrorMessage = "Gender is required")]
    public string Gender { get; set; }
    [Required(ErrorMessage = "Mobile Nois required")]
    public string TelePhone { get; set; }
    [Required(ErrorMessage = "Date of birth is required")]
    public DateTime DateOfBirth { get; set; }
    [Required(ErrorMessage = "Address is required")]
    public string Address { get; set; }
    [Required(ErrorMessage = "State is required")]
    public string State { get; set; }
    [Required(ErrorMessage = "Occupation is required")]
    public string Occupation { get; set; }
    [Required(ErrorMessage = "Identification type is required")]
    public string IdentificationType { get; set; }
    [Required(ErrorMessage = "Identification Number is required")]
    public string IdentificationNo { get; set; }
    [Required(ErrorMessage = "Means identification is required")]
    public IFormFile IdUploaderFile { get; set; }
  }
}
