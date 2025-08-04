import os
import sys

import pytest
from fastapi.testclient import TestClient

sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
from api import app, user_store  # type: ignore


@pytest.fixture(autouse=True)
def clear_users():
    user_store._users.clear()
    yield
    user_store._users.clear()


def test_create_and_list_users():
    client = TestClient(app)
    resp = client.post('/users', json={'username': 'alice', 'password': 'secret'})
    assert resp.status_code == 200
    data = resp.json()
    assert data['username'] == 'alice'

    resp = client.get('/users')
    assert resp.status_code == 200
    users = resp.json()
    assert any(u['username'] == 'alice' for u in users)


def test_duplicate_user_creation():
    client = TestClient(app)
    client.post('/users', json={'username': 'bob', 'password': 'pw'})
    resp = client.post('/users', json={'username': 'bob', 'password': 'pw'})
    assert resp.status_code == 400


def test_login_success_and_failure():
    client = TestClient(app)
    client.post('/users', json={'username': 'charlie', 'password': 'pw'})

    resp = client.post('/login', json={'username': 'charlie', 'password': 'pw'})
    assert resp.status_code == 200
    assert resp.json().get('success') is True

    resp = client.post('/login', json={'username': 'charlie', 'password': 'wrong'})
    assert resp.status_code == 401
