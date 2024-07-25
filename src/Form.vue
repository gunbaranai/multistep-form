<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
    <header>
        <div class="wrapper">
            <HelloWorld :msg="steps[currentStep-1].title" :desc="steps[currentStep-1].description"/>
        </div>
    </header>

    <div class="multistep-form">
        <div v-if="currentStep === 1">
            <form @submit.prevent="nextStep">
                <div class="form-input" v-for="field in steps[0].fields" :key="field.label">
                    <label>{{ field.label }}</label>
                    <input v-if="field.type === 'textfield'" :placeholder="field.placeholder" v-model="formData[field.label]" :required="field.required" />
                    <div v-if="field.type === 'radio'">
                        <div v-for="option in field.options" :key="option.value">
                            <input type="radio" :value="option.value" v-model="formData[field.label]" :required="field.required" />
                            <label>{{ option.label }}</label>
                        </div>
                    </div>
                </div>
                <button type="submit">Next</button>
            </form>
        </div>
    
        <div v-if="currentStep === 2">
            <form @submit.prevent="submitForm">
                <div class="form-input" v-for="field in steps[1].fields" :key="field.label">
                    <label>{{ field.label }}</label>
                    <textarea v-if="field.type === 'textarea'" :placeholder="field.placeholder" v-model="formData[field.label]" :required="field.required"></textarea>
                    <input v-if="field.type === 'autocomplete'" :placeholder="field.placeholder" v-model="formData[field.label]" :list="field.label" :required="field.required" />
                    <datalist :id="field.label">
                        <option v-for="option in field.options" :key="option">{{ option }}</option>
                    </datalist>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>    
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      formData: {},
      steps: [
        {
          step: 1,
          title: "Personal Information",
          description: "Please fill out your personal information",
          fields: [
            { type: "textfield", label: "Name", placeholder: "Enter your name", required: true },
            {
              type: "radio",
              label: "Gender",
              options: [
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" }
              ],
              required: true
            }
          ]
        },
        {
          step: 2,
          title: "Additional Information",
          description: "Please provide additional details",
          fields: [
            { type: "textarea", label: "Description", placeholder: "Enter a description", required: false },
            {
              type: "autocomplete",
              label: "Title",
              placeholder: "Enter a title",
              options: ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof."],
              required: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    submitForm() {
      console.log(this.formData);
      alert("Form submitted!");
    }
  }
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

.multistep-form {
    margin-top: 16px;
}

.form-input {
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: 1fr 2fr;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .multistep-form {
    margin-top: 0px;
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
