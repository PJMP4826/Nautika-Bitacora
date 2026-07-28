import random
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class FishPage(BasePage):

    _FISH_LINKS = (By.CSS_SELECTOR, "div.grid a")

    def __init__(self, driver, base_url: str):
        super().__init__(driver)
        self.url = base_url

    def click_random_fish(self, expected_url_part=None):
        # Encontramos todos los enlaces que coinciden con el selector
        elements = self.driver.find_elements(*self._FISH_LINKS)

        if not elements:
            raise Exception("No se encontraron enlaces de fish en la página.")

        # Seleccionamos uno al azar
        random_element = random.choice(elements)
        self.click_js(random_element)

        if expected_url_part:
            self.wait_for_url_change(expected_url_part)
