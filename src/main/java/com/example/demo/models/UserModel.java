package com.example.demo.models;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name="users")
public class UserModel implements UserDetails {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Size(max = 30)
	private String firstName;
	
	@NotBlank
	@Size(max = 30)
	private String lastName;
	
	@NotBlank
	@Size(max = 30)
	private String username;
	
	@NotBlank
	@JsonIgnore
	private String password;
	
	@Email
	@NotBlank
	@Size(max = 80)
	private String email;
	
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "user")
	@JsonIgnore
	private List<Authority> authorities = new ArrayList<>();
	
	
	private String intro;
	
	private String likedTopics;
	/*
	@ManyToMany(fetch = FetchType.LAZY, targetEntity = UserModel.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "user_friends", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "friends_id"))
	private Set<UserModel> friends; //set impide objetos duplicados!!
*/
	//userdetails
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	/*
	@OneToMany(fetch = FetchType.EAGER, targetEntity = RoleModel.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "user_social_media", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "social_media_id"))
	private Set<String> socialMedia;
	*/
	
	/*
	@ManyToMany(fetch = FetchType.EAGER, targetEntity = RoleModel.class, cascade = CascadeType.PERSIST)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<RoleModel> roles; //set impide objetos duplicados!!
	*/

}
