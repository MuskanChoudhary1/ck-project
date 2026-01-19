package com.cloudbalance.cloudbalance_backend.security;

import com.cloudbalance.cloudbalance_backend.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;

@Component
public class JwtUtil {

//    private final String SECRET = "uewfyugfghryfghjjhjiejuhuhfiuehiuwhiu";
//private final SecretKey SECRET = Keys.secretKeyFor(SignatureAlgorithm.HS256);


    @Value("${jwt.SECRET}")
    private String SECRET;

    private SecretKey getSecretKey() {

        return Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }


    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())  // email
                .claim("role", userDetails.getAuthorities().iterator().next().getAuthority())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
                .signWith(getSecretKey(), SignatureAlgorithm.HS256)
                .compact();

    }

    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }


    public boolean validateToken(String token, UserDetails userDetails) {
        String email = extractEmail(token);
        return email.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }


    private boolean isTokenExpired(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSecretKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration()
                .before(new Date());
    }

}
