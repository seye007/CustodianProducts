using System.ComponentModel.DataAnnotations;

namespace CustodianPlc.Models
{
	public class AutoInsuranceVm : PersonalVm
	{
		[Required(ErrorMessage ="Type of cover is required")]
		public string TypeOfCover { get; set; }

		[Required(ErrorMessage = "Vehicle Category is required")]
		public string VehicleCategory { get; set; }
		[Required(ErrorMessage = "Vehicle value is required")]
		public decimal VehicleValue { get; set; }
		[Required(ErrorMessage = "Payment option is required")]
		public string PaymentOption { get; set; }
		[Required(ErrorMessage = "Vehicle make is required")]
		public string VehicleMake { get; set; }

		[Required(ErrorMessage = "Model Of vehicle is required")]
		public string ModelOfVehicle { get; set; }
		[Required(ErrorMessage = "Registration number is required")]
		public string RegistrationNumber { get; set; }
		[Required(ErrorMessage = "chassis number is required")]
		public string ChassisNumber { get; set; }
		[Required(ErrorMessage = "Engine number is required")]
		public string EngineNumber { get; set; }

		[Required(ErrorMessage = "Year of make is required")]
		public string YearofMake { get; set; }

		[Required(ErrorMessage = "Car body type is required")]
		public string CarBodyType { get; set; }

		[Required(ErrorMessage = "Start date is required")]
		public DateTime StartDate { get; set; }

		[Required(ErrorMessage = "Vehicle color is required")]
		public string VehicleColor { get; set; }
		[Required(ErrorMessage = "Premium is required")]
		public string Premium { get; set; }
		public bool IsExtension { get; set; }
		public bool IsExcess { get; set; }
		public bool IsTracking { get; set; }
		public bool IsFlood { get; set; }
		public bool IsSRCC { get; set; }
	}
}
