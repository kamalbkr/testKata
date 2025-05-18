package com.springapp.backend.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.springapp.backend.model.Product;
import com.springapp.backend.repository.ProductRepository;

@Service
public class ImplServiceProduct implements ServiceDtoProduct {
	ProductRepository productRepository;
	
	@Autowired
	public ImplServiceProduct(ProductRepository productRepository) {

		this.productRepository = productRepository;
	}
	@Override
	public Product addProduct(Product product) {
		// TODO Auto-generated method stub
		return productRepository.save(product);
	}

	@Override
	public void deleteProduct(Integer productId) {
		// TODO Auto-generated method stub
		  productRepository.deleteById(productId);
	}

	@Override
	public Product updateProduct(Integer productId,Product product) {
		// TODO Auto-generated method stub
		Product p = productRepository.findById(productId).orElseThrow(()-> new RuntimeException("Le produit n'existe pas!"));
 		 p.setCode(product.getCode());
         p.setName(product.getName());
         p.setDescription(product.getDescription());
         p.setImage(product.getImage());
         p.setCategory(product.getCategory());
         p.setPrice(product.getPrice());
         p.setQuantity(product.getQuantity());
         p.setInternalReference(product.getInternalReference());
         p.setShellId(product.getShellId());
         p.setInventoryStatus(product.getInventoryStatus());
         p.setRating(product.getRating());
         p.setUpdatedAt(Instant.now());
         return productRepository.save(p);
	 
	}

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}
	@Override
	public Optional<Product> getProductById(Integer productId) {
		// TODO Auto-generated method stub

	     List<Product> products = getAllProducts();
	        return products.stream().filter(product -> product.getId().equals(productId)).findFirst();
	        
	        
	}
 

}
