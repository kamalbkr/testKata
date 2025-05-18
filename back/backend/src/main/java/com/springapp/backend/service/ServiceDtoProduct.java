package com.springapp.backend.service;

import java.util.List;
import java.util.Optional;


import com.springapp.backend.model.Product;

public interface ServiceDtoProduct {
public Product addProduct(Product product);
public void deleteProduct(Integer productId);
public Product updateProduct(Integer productId,Product product);
public List<Product> getAllProducts();
public Optional<Product> getProductById(Integer productId);
}
