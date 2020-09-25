package com.wata.payslip.service.Implements;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.wata.payslip.converter.PayslipConverter;
import com.wata.payslip.model.dtos.PayslipDTO;
import com.wata.payslip.model.dtos.SearchData;
import com.wata.payslip.model.entity.EmployeeEntity;
import com.wata.payslip.model.entity.PayslipEntity;
import com.wata.payslip.repository.AccountRepository;
import com.wata.payslip.repository.PayslipRepository;
import com.wata.payslip.service.Interface.IPayslipService;
import com.wata.payslip.utils.PagingUtil;
import com.wata.payslip.utils.SortUtil;

@Service
public class PayslipService implements IPayslipService {

	@Autowired
	private PayslipRepository payslipRepository;

	@Autowired
	private PayslipConverter payslipConverter;

	@Autowired
	private EntityManager entityManager;

	@Autowired
	private AccountRepository accountRepository;

	private Double totalWorkingDays(PayslipEntity payslipEntity) {
		return payslipEntity.getWorkingDays() + payslipEntity.getLeaveDays();
	}

	private Double totalSalary(PayslipEntity payslipEntity) {
		return payslipEntity.getGrossSalary() + payslipEntity.getResponsibilityAllowance()
				+ payslipEntity.getPackingAllowance() + payslipEntity.getBonus() + payslipEntity.getAdvance()
				+ payslipEntity.getOtherAllowance() + payslipEntity.getOvertimePay();
	}

	private Double netAmount(PayslipEntity payslipEntity) {
		return payslipEntity.getTotalSalary() - payslipEntity.getInsurance() - payslipEntity.getPersonalIncomeTax();
	}

	@Override
	public ResponseEntity<Map<String, Object>> createPayslip(PayslipDTO payslipDTO) {
		PayslipEntity entity = payslipConverter.toEntity(payslipDTO);
		try {
			EmployeeEntity employeeEntity = entityManager.getReference(EmployeeEntity.class,
					payslipDTO.getIdEmployee());
			entity.setEmployeeEntity(employeeEntity);
			entity.setTotalWorkingDays(totalWorkingDays(entity));
			entity.setTotalSalary(totalSalary(entity));
			entity.setNetAmount(netAmount(entity));
			entity = payslipRepository.save(entity);
			Map<String, Object> response = new HashMap<>();
			response.put("Payslip", payslipConverter.toDTO(entity));
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> getPayslipById(Integer idPayslip) {
		try {
			PayslipEntity entity = payslipRepository.findOneByIdPayslip(idPayslip);
			Map<String, Object> response = new HashMap<>();
			response.put("Payslip", payslipConverter.toDTO(entity));
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> getAllPayslip() {
		try {
			List<PayslipDTO> dtoes = payslipConverter.toDTOs(payslipRepository.findAll());
			Map<String, Object> response = new HashMap<>();
			response.put("Payslips", dtoes);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> deletePayslipById(Integer idPayslip) {
		try {
			payslipRepository.deleteById(idPayslip);
			return new ResponseEntity<>(null, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> updatePayslipById(PayslipDTO payslipDTO, Integer idPayslip) {
		PayslipEntity entity = payslipConverter.toEntity(payslipDTO);
		entity.setIdPayslip(idPayslip);
		try {
			EmployeeEntity employeeEntity = entityManager.getReference(EmployeeEntity.class,
					payslipDTO.getIdEmployee());
			entity.setEmployeeEntity(employeeEntity);
			entity.setTotalWorkingDays(totalWorkingDays(entity));
			entity.setTotalSalary(totalSalary(entity));
			entity.setNetAmount(netAmount(entity));
			entity = payslipRepository.save(entity);
			Map<String, Object> response = new HashMap<>();
			response.put("Payslip", payslipConverter.toDTO(entity));
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> searchPayslipByIdEmployee(SearchData searchData) {
		Integer idEmployee = searchData.getIdEmployee();
		try {
			List<PayslipEntity> payslipEntities = new ArrayList<PayslipEntity>();
			Pageable paging = SortUtil.sortAndPaging(searchData);
			Page<PayslipEntity> pageTuts = payslipRepository.getByIdEmployee(idEmployee, paging);
			payslipEntities = pageTuts.getContent();
			Map<String, Object> response = new HashMap<>();
			response = PagingUtil.getConvertResponse("Payslip", payslipConverter.toDTOs(payslipEntities), pageTuts);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> searchPayslipByStatus(SearchData searchData) {
		String status = searchData.getSearchValue().trim();
		try {
			List<PayslipEntity> payslipEntities = new ArrayList<PayslipEntity>();
			Pageable paging = SortUtil.sortAndPaging(searchData);
			Page<PayslipEntity> pageTuts = payslipRepository.findByStatus(status.trim(), paging);
			payslipEntities = pageTuts.getContent();
			Map<String, Object> response = new HashMap<>();
			response = PagingUtil.getConvertResponse("Payslip", payslipConverter.toDTOs(payslipEntities), pageTuts);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Override
	public ResponseEntity<Map<String, Object>> searchPayslipByEmail(SearchData searchData) {
		String email = searchData.getSearchValue();
		Integer idEmployee = accountRepository.findByUsername(email).get().getEmployeeEntity().getId();
		try {
			List<PayslipEntity> payslipEntities = new ArrayList<PayslipEntity>();
			Pageable paging = SortUtil.sortAndPaging(searchData);
			Page<PayslipEntity> pageTuts = payslipRepository.getByIdEmployee(idEmployee, paging);
			payslipEntities = pageTuts.getContent();
			Map<String, Object> response = new HashMap<>();
			response = PagingUtil.getConvertResponse("Payslip", payslipConverter.toDTOs(payslipEntities), pageTuts);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Override
	public ResponseEntity<Map<String, Object>> searchPayslipByMonth(SearchData searchData) {
		String value = searchData.getSearchValue();
		String year = value.split("\\-")[1];
		String month = value.split("\\-")[0];
		try {
			List<PayslipEntity> payslipEntities = new ArrayList<PayslipEntity>();
			Pageable paging = SortUtil.sortAndPaging(searchData);

			Page<PayslipEntity> pageTuts = payslipRepository.findByMonth(year, month, paging);
			payslipEntities = pageTuts.getContent();
			Map<String, Object> response = new HashMap<>();
			response = PagingUtil.getConvertResponse("Payslip", payslipConverter.toDTOs(payslipEntities), pageTuts);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} catch (Exception e) {
			System.out.print("Log..." + e.getMessage());
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
