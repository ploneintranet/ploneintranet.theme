# -*- coding: utf-8 -*-
"""Installer for the ploneintranet.theme package."""

from setuptools import find_packages
from setuptools import setup

import os


def read(*rnames):
    return open(os.path.join(os.path.dirname(__file__), *rnames)).read()

long_description = \
    read('README.rst') + \
    read('docs', 'CHANGELOG.rst')

setup(
    name='ploneintranet.theme',
    version='0.1',
    description="Theme for ploneintranet",
    long_description=long_description,
    # Get more from http://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        "Framework :: Plone",
        "Programming Language :: Python",
    ],
    keywords='Plone intranet theme',
    author='Plone Intranet Team',
    author_email='plone-developers@lists.sourceforge.net',
    url='http://pypi.python.org/pypi/ploneintranet.theme',
    license='BSD',
    packages=find_packages('src', exclude=['ez_setup']),
    namespace_packages=['ploneintranet'],
    package_dir={'': 'src'},
    include_package_data=True,
    zip_safe=False,
    install_requires=[
        'Plone',
        'plone.app.theming',
        'setuptools',
        'z3c.jbot',
    ],
    extras_require={
        'develop': [
            'flake8',
            'Sphinx',
            'zptlint',
        ],
    },
    entry_points="""
    [z3c.autoinclude.plugin]
    target = plone
    """,
)
