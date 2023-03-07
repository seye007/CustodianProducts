using CustodianPlc.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustodianPlc.Controllers
{
	public class SafetyPlusPlanController : Controller
	{
		[Route("Sales/Safety-Plus-Plan")]
		public IActionResult Index()
		{
			return View();
		}
		[HttpPost]
		[Route("Sales/Safety-Plus-Plan")]
		public IActionResult Index(SafetyPlusVm safetyPlusPlanVm)
		{
			if (!ModelState.IsValid)
			{
				return View(safetyPlusPlanVm);
			}
			return View(safetyPlusPlanVm);
		}

		[HttpGet]
		[Route("Sales/Safety-Plus-Plan/CalculatePremium")]
		public IActionResult CalculatePremium(int unit)
		{
			if (unit > 0 && unit <= 5)
			{
				var premium = unit * 10000;
				return Json(new { premium });
			}

			return BadRequest("Error calculating premium, make sure to input a valid unit");
		}
	}
}
