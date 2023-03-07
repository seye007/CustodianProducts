using CustodianPlc.Models;
using Microsoft.AspNetCore.Mvc;

namespace CustodianPlc.Controllers
{
	public class EventInsuranceController : Controller
	{
		[Route("Sales/EventInsurance")]
		public IActionResult Index()
		{
			return View();
		}

		[HttpPost]
		[Route("Sales/Event-Insurance")]
		[ValidateAntiForgeryToken]
		public IActionResult Index(EventInsuranceVm eventInsurance)
		{
			if (!ModelState.IsValid)
			{
				return View(eventInsurance);
			}
			return View();
		}
	}
}
