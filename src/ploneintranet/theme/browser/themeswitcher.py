from zope.publisher.browser import BrowserView
import logging
from plone import api
from ploneintranet.theme.config import THEME_SWITCHER_SESSION_ID
from collective.themeswitcher.switcher import PloneThemeSwitcher

logger = logging.getLogger("ploneintranet.theme")


class DisableTheme(BrowserView):
    """
    Enabling session variable used by theme plugin to modify enabled theme
    """

    def __call__(self):
        sdm = api.portal.get_tool('session_data_manager')
        session = sdm.getSessionData(create=True)
        session.set(THEME_SWITCHER_SESSION_ID, True)
        api.portal.show_message(message='Theme is disabled', request=self.request)
        self.request.response.redirect(self.context.absolute_url())


class EnableTheme(BrowserView):
    """
    Disabling session variable used by theme plugin to modify enabled theme
    """

    def __call__(self):
        sdm = api.portal.get_tool('session_data_manager')
        session = sdm.getSessionData(create=False)
        if session is None:
            return
        if session.get(THEME_SWITCHER_SESSION_ID, None):
            session.set(THEME_SWITCHER_SESSION_ID, None)
        api.portal.show_message(message='Theme is enabled', request=self.request)
        self.request.response.redirect(self.context.absolute_url())

class SessionThemeSwitcher(PloneThemeSwitcher):

    def __call__(self):
        self.update()
        self.request.response.redirect(self.context.absolute_url())

    def update(self):
        super(SessionThemeSwitcher, self).update()
        sdm = api.portal.get_tool('session_data_manager')
        session = sdm.getSessionData(create=False)
        if session is None:
            return
        if self.theme is None and session.get(THEME_SWITCHER_SESSION_ID, None):
            KEY = "collective.themeswitcher.theme.barcelonetta"
            self.theme = self.portal_registry.get(KEY, None)
            logger.info('switch to %s' % self.theme)
