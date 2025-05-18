package com.springapp.backend.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

 import com.springapp.backend.model.Product;
import com.springapp.backend.service.ServiceDtoProduct;


@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	ServiceDtoProduct service;
	
	
	@GetMapping()
	public ResponseEntity<List<Product>> getProducts(){
		return  ResponseEntity.ok(service.getAllProducts());
	}
	  @GetMapping("/{id}")
	    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
		  Product product = service.getProductById(id).orElse(null);
		    return ResponseEntity.ok(product);
	    }
	    @PostMapping
	    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
 	        return ResponseEntity.ok(service.addProduct(product));
 	    }
 
    @PatchMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
       
            return ResponseEntity.ok(service.updateProduct(id, product));
     
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
      
        return  ResponseEntity.noContent().build();
    }

}
