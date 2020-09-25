package com.wata.payslip.service.Interface;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import com.wata.payslip.model.dtos.PayslipDTO;
import com.wata.payslip.model.dtos.SearchData;

public interface IPayslipService {
	public ResponseEntity<Map<String, Object>> createPayslip(PayslipDTO payslipDTO);

	public ResponseEntity<Map<String, Object>> getAllPayslip();

	public ResponseEntity<Map<String, Object>> getPayslipById(Integer idPayslip);

	public ResponseEntity<Map<String, Object>> deletePayslipById(Integer idPayslip);

	public ResponseEntity<Map<String, Object>> updatePayslipById(PayslipDTO payslipDTO, Integer idPayslip);

	public ResponseEntity<Map<String, Object>> searchPayslipByIdEmployee(SearchData searchData);

	public ResponseEntity<Map<String, Object>> searchPayslipByStatus(SearchData searchData);

	public ResponseEntity<Map<String, Object>> searchPayslipByEmail(SearchData searchData);

	public ResponseEntity<Map<String, Object>> searchPayslipByMonth(SearchData searchData);

}
