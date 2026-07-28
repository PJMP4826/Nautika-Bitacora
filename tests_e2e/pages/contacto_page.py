from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class ContactoPage(BasePage):
    _TITLE_LABEL = (By.CSS_SELECTOR, "h2.text-4xl")
    _NAME_INPUT = (By.ID, "name")
    _LAST_NAME_INPUT = (By.ID, "last-name")
    _EMAIL_INPUT = (By.ID, "email")
    _PHONE_NUMBER_INPUT = (By.ID, "phone-number")
    _MESSAGE_INPUT = (By.ID, "your-message")
    _SUBMIT_BUTTON = (By.ID, "submit-button")

    _SUCCESS_MODAL_TITLE = (By.XPATH, "//h3[text()='¡Mensaje enviado!']")

    _VALIDATION_ERROR_DIV = (By.XPATH, f"//div[text()='validation.required']")

    def __init__(self, driver, base_url: str):
        super().__init__(driver)
        self.url = f"{base_url}/contact"

    def open(self):
        self.driver.get(self.url)

    def get_title_page(self) -> str:
        return self.get_text(self._TITLE_LABEL)

    def fill_and_submit_form(self, name, last_name: str, email, phone_number:str, message):
        # Usamos type_text de tu BasePage para llenar los datos
        self.type_text(self._NAME_INPUT, name)
        self.type_text(self._LAST_NAME_INPUT, last_name)
        self.type_text(self._EMAIL_INPUT, email)
        self.type_text(self._PHONE_NUMBER_INPUT, phone_number)
        self.type_text(self._MESSAGE_INPUT, message)

        # Usamos click para enviar
        self.click(self._SUBMIT_BUTTON)

    def get_success_modal_text(self) -> str:
        return self.get_text(self._SUCCESS_MODAL_TITLE)

    def get_validation_error_by_text(self):
        return self.get_text(self._VALIDATION_ERROR_DIV)
