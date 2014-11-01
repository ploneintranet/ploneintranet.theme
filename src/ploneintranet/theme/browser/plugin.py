import logging
from zope.interface import implements
from plone import api
from plone.app.theming.interfaces import IThemePlugin
from ploneintranet.theme.config import THEME_SWITCHER_SESSION_ID


logger = logging.getLogger(__name__)


class ThemeSwitcherPlugin(object):
    """This plugin dynamically changes theme settings. For now it disables current theme.
    """

    implements(IThemePlugin)

    dependencies = ()

    def onDiscovery(self, theme, settings, dependenciesSettings):
        pass

    def onCreated(self, theme, settings, dependenciesSettings):
        pass

    def onEnabled(self, theme, settings, dependenciesSettings):
        pass

    def onDisabled(self, theme, settings, dependenciesSettings):
        pass

    def onRequest(self, request, theme, settings, dependenciesSettings):
        sdm = api.portal.get_tool('session_data_manager')
        session = sdm.getSessionData(create=False)
        if session is None:
            return
        if session.get(THEME_SWITCHER_SESSION_ID):
            request.response.setHeader('X-Theme-Disabled', True)
