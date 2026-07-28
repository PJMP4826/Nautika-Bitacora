import uuid

import time

from pages.home_page import HomePage
from pages.contacto_page import ContactoPage


def get_random_email():
    return f"test_{uuid.uuid4().hex[:8]}@ejemplo.com"


def test_user_journey_contact_form(driver, base_url):
    # 1. Iniciamos en la página principal
    home_page = HomePage(driver, base_url)
    home_page.open()

    # 2. Navegamos a Contacto
    home_page.go_to_contact()

    # 3. Llenamos y enviamos el formulario
    contacto_page = ContactoPage(driver, base_url)
    contacto_page.fill_and_submit_form(
        name="First-Name-Test",
        last_name="Last-Name-Test",
        email=get_random_email(),
        phone_number="9945679765",
        message="Este es un mensaje automatizado simulando un flujo real.",
    )

    # 4. ASERCIÓN: Verificar que aparezca el modal de éxito
    # Esto esperará automáticamente hasta 10 segundos a que el modal sea visible
    mensaje_exito = contacto_page.get_success_modal_text()

    assert "¡Mensaje enviado!" in mensaje_exito
    print("\nEnvio de formulario correcto")

    time.sleep(0.8)


def test_form_validation_required_fields(driver, base_url):
    home_page = HomePage(driver, base_url)
    home_page.open()
    home_page.go_to_contact()

    contacto_page = ContactoPage(driver, base_url)

    # 1. Enviar con campos faltantes
    contacto_page.fill_and_submit_form(
        name="Test",
        last_name="",  # Este campo dispara el error
        email=get_random_email(),
        phone_number="9945679765",
        message="Mensaje",
    )

    # 2. Verificar que el elemento con el texto específico existe
    # Si no aparece, el WebDriverWait (en get_validation_error_by_text) lanzará un TimeoutException
    error_text = contacto_page.get_validation_error_by_text()

    assert error_text == "validation.required"
    print("\nValidacion de formulario correcta")

    time.sleep(0.8)
