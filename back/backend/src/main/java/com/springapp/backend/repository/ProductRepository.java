package com.springapp.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.springapp.backend.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

	 
}
