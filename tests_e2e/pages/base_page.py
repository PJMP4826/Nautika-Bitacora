from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


class BasePage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 10)

    def click(self, locator):
        self.wait.until(EC.element_to_be_clickable(locator)).click()

    def type_text(self, locator, text):
        element = self.wait.until(EC.visibility_of_element_located(locator))
        element.clear()
        element.send_keys(text)

    def get_text(self, locator):
        return self.wait.until(EC.visibility_of_element_located(locator)).text

    def scroll_smooth(self, pixels=500, delay=0.1):
        """Hace scroll hacia abajo de forma suave."""
        import time

        current_scroll = 0
        while current_scroll < pixels:
            self.driver.execute_script(f"window.scrollBy(0, 50);")
            current_scroll += 50
            time.sleep(delay)

    def wait_for_url_change(self, expected_url_part, timeout=10):
        self.wait.until(EC.url_contains(expected_url_part))
