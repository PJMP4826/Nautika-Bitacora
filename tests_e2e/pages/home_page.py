from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class HomePage(BasePage):
    _CONTACT_BUTTON = (By.XPATH, "//button[contains(text(), 'Contacto')]")
    _ZONES_BUTTON = (By.XPATH, "//button[contains(text(), 'Explorar Zonas')]")
    _FISH_BUTTON = (By.XPATH, "//button[contains(text(), 'Peces')]")

    def __init__(self, driver, base_url: str):
        super().__init__(driver)
        self.url = base_url

    def open(self):
        self.driver.get(self.url)

    def go_to_contact(self):
        self.click(self._CONTACT_BUTTON)

    def go_to_zone(self):
        self.click(self._ZONES_BUTTON)
        self.wait_for_url_change("/zones")

    def go_to_fish(self):
        self.click(self._FISH_BUTTON)
        self.wait_for_url_change("/fish")

    
