<?php
use PHPUnit\Framework\TestCase;

class UserRegistrationTest extends TestCase {
    public function testIsValidUsername() {
        $this->assertTrue(isValidUsername("validUsername123"));
        $this->assertFalse(isValidUsername("invalid username"));
        $this->assertFalse(isValidUsername("invalid!username"));
        $this->assertFalse(isValidUsername("username_with_space "));
    }

    public function testIsValidRealName() {
        $this->assertTrue(isValidRealName("John Doe"));
        $this->assertTrue(isValidRealName("Jane"));
        $this->assertFalse(isValidRealName("John123"));
        $this->assertFalse(isValidRealName("Jane_Doe"));
        $this->assertFalse(isValidRealName("Jane Doe "));
    }

    public function testIsValidPassword() {
        $this->assertTrue(isValidPassword("password123"));
        $this->assertFalse(isValidPassword("short"));
        $this->assertFalse(isValidPassword("pass with space"));
        $this->assertFalse(isValidPassword("pass\nword"));
    }
}
?>
