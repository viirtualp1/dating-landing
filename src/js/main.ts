interface RegistrationData {
  email: string;
  password: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
}

interface AuthResponse {
  success: boolean;
  token?: string;
}

const CONSTANTS = {
  POPUP_DELAY: 100,
  REDIRECT_DELAY: 2500,
  FORM_ERROR_DELAY: 5000,
};

const elements = {
  popup: document.getElementById("registrationPopup") as HTMLDialogElement,
  popupHeader: document.querySelector(".popup__header") as HTMLElement,
  form: document.getElementById("registrationForm") as HTMLFormElement,
  closeBtn: document.querySelector(".popup__close") as HTMLButtonElement,
  submitBtn: document.querySelector(".popup__submit-btn") as HTMLButtonElement,
  successMessage: document.getElementById("successMessage") as HTMLElement,
  signUpBtn: document.querySelector(".index-page__button") as HTMLButtonElement,
  emailInput: document.getElementById("email") as HTMLInputElement,
  passwordInput: document.getElementById("password") as HTMLInputElement,
};

const createErrorElement = (message: string): HTMLElement => {
  const errorElement = document.createElement("div");
  errorElement.className = "field-error";
  errorElement.innerHTML = `⚠️ ${message}`;
  return errorElement;
};

const removeFieldError = (input: HTMLInputElement): void => {
  const formGroup = input.closest(".form-group");
  const existingError = formGroup?.querySelector(".field-error");
  if (existingError) {
    existingError.remove();
  }
  input.style.borderColor = "#e1e5e9";
};

const showFieldError = (input: HTMLInputElement, message: string): void => {
  removeFieldError(input);
  input.style.borderColor = "#e74c3c";

  const formGroup = input.closest(".form-group");
  if (formGroup) {
    const errorElement = createErrorElement(message);
    formGroup.appendChild(errorElement);
  }
};

const showFormError = (message: string): void => {
  const form = document.getElementById("registrationForm") as HTMLFormElement;
  let errorElement = form.querySelector(".form-error") as HTMLElement;

  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "form-error";
    errorElement.style.cssText = `
      background: #fee;
      color: #c33;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      border: 1px solid #fcc;
      font-size: 0.9rem;
    `;
    form.insertBefore(errorElement, form.firstChild);
  }

  errorElement.textContent = message;

  setTimeout(() => {
    if (errorElement && errorElement.parentNode) {
      errorElement.parentNode.removeChild(errorElement);
    }
  }, CONSTANTS.FORM_ERROR_DELAY);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

const validateForm = (data: RegistrationData): boolean => {
  const { emailInput, passwordInput } = elements;
  let isValid = true;

  removeFieldError(emailInput);
  removeFieldError(passwordInput);

  if (!data.email || data.email.trim() === "") {
    showFieldError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(data.email.trim())) {
    showFieldError(emailInput, "Please enter a valid email address");
    isValid = false;
  }

  if (!data.password || data.password === "") {
    showFieldError(passwordInput, "Password is required");
    isValid = false;
  } else if (!validatePassword(data.password)) {
    showFieldError(
      passwordInput,
      "Password must be at least 8 characters long"
    );
    isValid = false;
  }

  return isValid;
};

const makeApiRequest = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const requestOptions: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  if (options.body) {
    requestOptions.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  } else {
    const { "Content-Type": _, ...headersWithoutContentType } =
      requestOptions.headers as Record<string, string>;
    requestOptions.headers = headersWithoutContentType;
  }

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

const checkAuth = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const credentials = btoa(`${email}:${password}`);

    const response = await makeApiRequest("https://api.dating.com/identity", {
      method: "GET",
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });

    const token = response.headers.get("X-Token");

    return { success: true, token: token || undefined };
  } catch (error) {
    return { success: false };
  }
};

const registerUser = async (data: RegistrationData): Promise<AuthResponse> => {
  const response = await makeApiRequest("https://api.dating.com/identity", {
    method: "PUT",
    body: JSON.stringify(data),
  });

  const token = response.headers.get("X-Token");

  return { success: true, token: token || undefined };
};

const saveToken = (token: string): void => {
  localStorage.setItem("dating_token", token);
};

const getToken = (): string | null => {
  return localStorage.getItem("dating_token");
};

const redirectToAuthZone = (token: string): void => {
  window.location.href = `https://www.dating.com/people/#token=${token}`;
};

const checkExistingAuth = (): void => {
  const token = getToken();
  if (token) {
    redirectToAuthZone(token);
  }
};

const openPopup = (): void => {
  const { popup, emailInput } = elements;

  popup.showModal();
  resetForm();
  blockScroll();
  showSuccessMessage();

  setTimeout(() => emailInput.focus(), CONSTANTS.POPUP_DELAY);
};

const closePopup = (): void => {
  const { popup } = elements;
  popup.close();
  resetForm();
  unblockScroll();
};

const blockScroll = (): void => {
  document.body.style.overflow = "hidden";
};

const unblockScroll = (): void => {
  document.body.style.overflow = "auto";
};

const resetForm = (): void => {
  const { form, successMessage, submitBtn, emailInput, passwordInput } =
    elements;

  form.reset();
  successMessage.style.display = "none";
  submitBtn.disabled = false;
  submitBtn.textContent = "Submit";

  removeFieldError(emailInput);
  removeFieldError(passwordInput);

  const formError = form.querySelector(".form-error");
  if (formError) {
    formError.remove();
  }
};

const showSuccessMessage = (token: string): void => {
  const { form, successMessage, popupHeader } = elements;

  form.style.display = "none";
  successMessage.style.display = "block";
  popupHeader.style.display = "none";

  // setTimeout(() => {
  // redirectToAuthZone(token);
  // }, CONSTANTS.REDIRECT_DELAY);
};

const setLoadingState = (isLoading: boolean): void => {
  const { submitBtn } = elements;

  submitBtn.disabled = isLoading;
  submitBtn.textContent = isLoading ? "Signing Up..." : "Sign Up";
};

const handleRegistration = async (data: RegistrationData): Promise<void> => {
  setLoadingState(true);

  try {
    const authResult = await checkAuth(data.email, data.password);

    if (authResult.success && authResult.token) {
      saveToken(authResult.token);
      showSuccessMessage(authResult.token);
      return;
    }

    const registrationResult = await registerUser(data);

    if (registrationResult.success && registrationResult.token) {
      saveToken(registrationResult.token);
      showSuccessMessage(registrationResult.token);
    } else {
      showFormError("Registration failed. Please try again.");
    }
  } catch (error) {
    console.error("Registration error:", error);
    showFormError("Network error. Please check your connection and try again.");
  } finally {
    setLoadingState(false);
  }
};

const handleFormSubmit = (e: Event): void => {
  e.preventDefault();

  const { form } = elements;
  const formData = new FormData(form);
  const registrationData: RegistrationData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  if (validateForm(registrationData)) {
    handleRegistration(registrationData);
  }
};

const setupRealTimeValidation = (): void => {
  const { emailInput, passwordInput } = elements;

  emailInput.addEventListener("blur", () => {
    const email = emailInput.value.trim();
    if (email && !validateEmail(email)) {
      showFieldError(emailInput, "Please enter a valid email address");
    } else if (email) {
      removeFieldError(emailInput);
    }
  });

  passwordInput.addEventListener("blur", () => {
    const password = passwordInput.value;
    if (password && !validatePassword(password)) {
      showFieldError(
        passwordInput,
        "Password must be at least 8 characters long"
      );
    } else if (password) {
      removeFieldError(passwordInput);
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.style.borderColor === "rgb(231, 76, 60)") {
      removeFieldError(emailInput);
    }
  });

  passwordInput.addEventListener("input", () => {
    if (passwordInput.style.borderColor === "rgb(231, 76, 60)") {
      removeFieldError(passwordInput);
    }
  });
};

const setupEventListeners = (): void => {
  const { signUpBtn, closeBtn, popup, form } = elements;

  signUpBtn.addEventListener("click", openPopup);

  closeBtn.addEventListener("click", closePopup);

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      closePopup();
    }
  });

  form.addEventListener("submit", handleFormSubmit);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.open) {
      closePopup();
    }
  });

  setupRealTimeValidation();
};

const init = (): void => {
  setupEventListeners();
};

document.addEventListener("DOMContentLoaded", init);
