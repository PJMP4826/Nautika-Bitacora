from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class HomePage(BasePage):
    _CONTACT_BUTTON = (By.XPATH, "//button[contains(text(), 'Contacto')]")

    def __init__(self, driver, base_url: str):
        super().__init__(driver)
        self.url = base_url

    def open(self):
        self.driver.get(self.url)

    def go_to_contact(self):
        self.click(self._CONTACT_BUTTON)
