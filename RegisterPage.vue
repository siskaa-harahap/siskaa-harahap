<template>
  <div class="register-container">
    <div class="register-box">
      <h2 style="text-align:center">Register</h2>

      <form @submit.prevent="register">
        <div class="input-group">
          <label>Username</label>
          <input v-model="username" placeholder="Masukkan username" />
        </div>

        <div class="input-group">
          <label>Email</label>
          <input v-model="email" type="email" placeholder="Masukkan email" />
        </div>

        <div class="input-group">
          <label>Password</label>
          <input v-model="password" type="password" placeholder="Masukkan password" />
        </div>

        <button class="register-btn">Daftar</button>
      </form>

      <p>Sudah punya akun?
        <a @click="$router.push('/LoginPage')">Login di sini</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },

  methods: {
    async register() {
      if (!this.username || !this.email || !this.password) {
        alert("Semua field wajib diisi!");
        return;
      }

      try {
        const response = await fetch("http://localhost:8080/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password
          })
        });

        const result = await response.json();

        if (result.status) {
          alert(result.message || "Register berhasil!");
          this.$router.push("/LoginPage");
        } else {
          alert(result.message || "Register gagal!");
        }

      } catch (error) {
        console.error("Register Error:", error);
        alert("Tidak bisa konek ke server.");
      }
    }
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #7bc8e6;
}

.register-box {
  background-color: #fff;
  padding: 25px;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0,0,0,0.1);
  width: 320px;
  text-align: center;
}

.input-group {
  margin-bottom: 12px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.register-btn {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.register-btn:hover {
  background-color: #3e8e41;
}

a {
  color: #4CAF50;
  cursor: pointer;
}
</style>