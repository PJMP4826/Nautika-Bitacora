import random
from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class ZonePage(BasePage):

    _ZONES_LINKS = (By.CSS_SELECTOR, "div.grid a")

    def __init__(self, driver, base_url: str):
        super().__init__(driver)
        self.url = base_url

    def click_random_zone(self, expected_url_part=None):
        # Encontramos todos los enlaces que coinciden con el selector
        elements = self.driver.find_elements(*self._ZONES_LINKS)

        if not elements:
            raise Exception("No se encontraron enlaces de zonas en la página.")

        # Seleccionamos uno al azar
        random_element = random.choice(elements)

        if not expected_url_part:
            random_element.click()

        random_element.click()
        self.wait_for_url_change(expected_url_part)

    def explore_page(self):
        # Baja 3000px suavemente
        self.scroll_smooth(pixels=3000, delay=0.05)
