from zope.publisher.browser import BrowserView
from plone import api
from ploneintranet.theme.config import THEME_SWITCHER_SESSION_ID


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
