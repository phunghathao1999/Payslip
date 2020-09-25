package com.wata.payslip.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.wata.payslip.model.dtos.PayslipDTO;
import com.wata.payslip.model.dtos.SearchData;
import com.wata.payslip.service.Interface.IPayslipService;

@RestController
@RequestMapping("/api/payslip")
public class PayslipController {

	@Autowired
	private IPayslipService iPayslipService;

	@GetMapping("/{id}")
	public ResponseEntity<Map<String, Object>> getPayslipById(@PathVariable(value = "id") Integer idPayslip) {
		return iPayslipService.getPayslipById(idPayslip);
	}

	@GetMapping("/")
	public ResponseEntity<Map<String, Object>> getAllPayslip() {
		return iPayslipService.getAllPayslip();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Map<String, Object>> deletePayslipById(@PathVariable(value = "id") Integer idPayslip) {
		return iPayslipService.deletePayslipById(idPayslip);
	}

	@RequestMapping(value = "/create", headers = "Accept=application/json", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> createPayslip(@Validated @RequestBody PayslipDTO payslipDTO) {
		return iPayslipService.createPayslip(payslipDTO);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Map<String, Object>> updatePayslipById(@RequestBody PayslipDTO payslipDTO,
			@PathVariable Integer id) {
		return iPayslipService.updatePayslipById(payslipDTO, id);
	}

	@RequestMapping(value = "/employee", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> searchPayslipByIdEmployee(@RequestBody SearchData searchData) {
		return iPayslipService.searchPayslipByIdEmployee(searchData);
	}

	@RequestMapping(value = "/status", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> searchPayslipByStatus(@RequestBody SearchData searchData) {
		return iPayslipService.searchPayslipByStatus(searchData);
	}

	@RequestMapping(value = "/email", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> searchPayslipByEmail(@RequestBody SearchData searchData) {
		return iPayslipService.searchPayslipByEmail(searchData);
	}

	@RequestMapping(value = "/month", method = RequestMethod.POST)
	public ResponseEntity<Map<String, Object>> searchPayslipByMonth(@RequestBody SearchData searchData) {
		return iPayslipService.searchPayslipByMonth(searchData);
	}
}
