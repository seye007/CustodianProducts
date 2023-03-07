using System.ComponentModel.DataAnnotations;

namespace CustodianPlc.Models
{
	public class EventInsuranceVm
	{ 
      [Required]
      public string FirstName { get; set; }
      [Required]
      public string LastName { get; set; }
      [Required]
      public string CompanyName { get; set; }
      [Required]
      public string Email { get; set; }
      [Required]
      public string PhoneNumber { get; set; }
      [Required]
      public string InvolvementDetails { get; set; }
      [Required]
      public string EventType { get; set; }
      [Required]
      public string EventHoldingType { get; set; }
      [Required]
      public string ExpectedGuests { get; set; }
      [Required]
      public string SumInsured { get; set; }
      [Required]
      public DateTime EventDate { get; set; }
      [Required]
      public string EventDuration { get; set; }
      public bool PublicLiability { get; set; }
      public bool ProfessionalIndemnity { get; set; }
      public bool EventEquipment { get; set; }
      public bool EventCancellation { get; set; }
      public bool EmployeeAccidentBenefit { get; set; }
    }
  }

