AUI.add("liferay-plugin-dockbar-notifications",function(a){var b=a.Component.create({AUGMENTS:[Liferay.PortletBase],EXTENDS:a.Base,NAME:"dockbarnotifications",prototype:{initializer:function(d){var c=this;c._actionableNotificationsList=d.actionableNotificationsList;c._baseActionURL=d.baseActionURL;c._baseResourceURL=d.baseResourceURL;c._nonActionableNotificationsList=d.nonActionableNotificationsList;c._portletKey=d.portletKey;var e=a.one(".dockbar-user-notifications");e.on("click",function(h){var j=h.target;if(j.ancestor(".dockbar-user-notifications-container")){return}c._setDelivered();var i=h.currentTarget;var f=i.one(".dockbar-user-notifications-container");f.toggleClass("open");var g=f.hasClass("open");if(g){i.on("clickoutside",function(k){f.removeClass("open")});c._nonActionableNotificationsList.render();c._actionableNotificationsList.render()}});a.on("domready",function(){Liferay.Poller.addListener(c._portletKey,c._onPollerUpdate,c)});Liferay.on("updateNotificationsCount",c._getNotificationsCount,c)},_getNotificationsCount:function(){var c=this;var d=new Liferay.PortletURL.createURL(c._baseResourceURL);d.setResourceId("getNotificationsCount");a.io.request(d.toString(),{dataType:"JSON",on:{success:function(){var e=this.get("responseData");if(e){var f=e.newUserNotificationsCount;var g=e.timestamp;var h=e.unreadUserNotificationsCount;c._updateDockbarNotificationsCount(f,g,h)}}}})},_onPollerUpdate:function(d){var c=this;c._updateDockbarNotificationsCount(d.newUserNotificationsCount,d.timestamp,d.unreadUserNotificationsCount)},_setDelivered:function(){var c=this;var d=new Liferay.PortletURL.createURL(c._baseActionURL);d.setParameter("javax.portlet.action","setDelivered");d.setWindowState("normal");a.io.request(d.toString())},_updateDockbarNotificationsCount:function(d,f,g){var c=this;if(!c._previousTimestamp||(c._previousTimestamp<f)){c._previousTimestamp=f;var e=a.one(".dockbar-user-notifications .user-notifications-count");if(e){e.toggleClass("alert",(d>0));e.setHTML(g)}}}}});Liferay.DockbarNotifications=b},"",{requires:["aui-base","aui-io","liferay-poller","liferay-portlet-base","liferay-portlet-url"]});AUI.add("liferay-plugin-notifications",function(a){var b=a.Component.create({AUGMENTS:[Liferay.PortletBase],EXTENDS:a.Base,NAME:"notifications",prototype:{initializer:function(f){var d=this;d._actionableUserNotificationsStart=0;d._baseRenderURL=f.baseRenderURL;d._nonActionableUserNotificationsStart=0;d._notificationsList=f.notificationsList;d._notificationsList.render();var j=a.one(".notifications-portlet .user-notifications-container .notifications-configurations");var c=a.one(".notifications-portlet .user-notifications-container .user-notifications-list");var e=a.one(".notifications-portlet .user-notifications-container");var i=a.one(".notifications-portlet .user-notifications-container .user-notifications-sidebar .nav .non-actionable");if(i){i.on("click",function(){var k=a.one(".user-notifications-sidebar");if(k){k.all(".nav a").removeClass("selected")}i.addClass("selected");if(e){e.addClass("non-actionable");e.removeClass("actionable")}j.hide();c.show();d._notificationsList.setActionable(false);d._notificationsList.setNotificationsCount(".non-actionable .count");d._actionableUserNotificationsStart=d._notificationsList.getStart();d._notificationsList.setStart(d._nonActionableUserNotificationsStart);d._notificationsList.render()})}var h=a.one(".notifications-portlet .user-notifications-container .user-notifications-sidebar .nav .actionable");if(h){h.on("click",function(){var k=a.one(".user-notifications-sidebar");if(k){k.all(".nav a").removeClass("selected")}h.addClass("selected");if(e){e.addClass("actionable");e.removeClass("non-actionable")}j.hide();c.show();d._notificationsList.setActionable(true);d._notificationsList.setNotificationsCount(".actionable .count");d._nonActionableUserNotificationsStart=d._notificationsList.getStart();d._notificationsList.setStart(d._actionableUserNotificationsStart);d._notificationsList.render()})}var g=a.one(".notifications-portlet .user-notifications-container .user-notifications-sidebar .nav .manage");if(g){g.on("click",function(){var l=a.one(".user-notifications-sidebar");if(l){l.all(".nav a").removeClass("selected")}g.addClass("selected");if(j){j.show();j.plug(a.LoadingMask).loadingmask.show();c.hide();var k=new Liferay.PortletURL.createURL(d._baseRenderURL);k.setParameter("mvcPath","/notifications/configuration.jsp");k.setWindowState("exclusive");j.plug(a.Plugin.ParseContent);j.load(k.toString(),function(){j.unplug(a.LoadingMask)})}})}}}});Liferay.Notifications=b},"",{requires:["aui-base","aui-io","liferay-portlet-base","liferay-portlet-url","node-load"]});AUI.add("liferay-plugin-notifications-list",function(a){var c=a.Lang;var b=a.Component.create({AUGMENTS:[Liferay.PortletBase],EXTENDS:a.Base,NAME:"notificationslist",prototype:{initializer:function(e){var d=this;d._actionable=e.actionable;d._baseActionURL=e.baseActionURL;d._baseRenderURL=e.baseRenderURL;d._baseResourceURL=e.baseResourceURL;d._delta=e.delta;d._end=e.start+e.delta;d._fullView=e.fullView;d._namespace=e.namespace;d._nextPageNode=e.nextPageNode;d._markAllAsReadNode=e.markAllAsReadNode;d._notificationsContainer=e.notificationsContainer;d._notificationsCount=e.notificationsCount;d._notificationsNode=e.notificationsNode;d._paginationInfoNode=e.paginationInfoNode;d._portletKey=e.portletKey;d._previousPageNode=e.previousPageNode;d._start=e.start;d._bindUI()},getStart:function(){var d=this;return d._start},render:function(){var d=this;var g=a.one(d._notificationsContainer);var e=g.one(d._notificationsNode);e.plug(a.LoadingMask);e.loadingmask.show();var f=new Liferay.PortletURL.createURL(d._baseResourceURL);f.setParameter("actionable",d._actionable);f.setParameter("end",d._end);f.setParameter("fullView",d._fullView);f.setParameter("start",d._start);f.setResourceId("getUserNotificationEvents");a.io.request(f.toString(),{dataType:"JSON",on:{success:function(){var m=this.get("responseData");if(m){var h=m.newTotalUuserNotificationEventsCount;var w=g.one(d._notificationsCount);if(w){w.setHTML(h)}var r=[];var n=m.entries;if(n){for(var q=0;q<n.length;q++){r.push(n[q])}r=r.join("")}var v=g.one(d._markAllAsReadNode);var p;if(v){p=v.one("a")}var l=(n.length>0);if(!l){var y='\u004e\u006f\u0020\u0074\u0069\u0065\u006e\u0065\u0020\u006e\u0069\u006e\u0067\u0075\u006e\u0061\u0020\u006e\u006f\u0074\u0069\u0066\u0069\u0063\u0061\u0063\u0069\u00f3\u006e\u002e';if(d._actionable){y='\u004e\u006f\u0020\u0074\u0069\u0065\u006e\u0065\u0073\u0020\u006e\u0069\u006e\u0067\u0075\u006e\u0061\u0020\u0070\u0065\u0074\u0069\u0063\u0069\u00f3\u006e\u002e'}e.setHTML('<div class="message">'+y+"</div>");if(p){p.hide()}}else{e.setHTML(r);var o=m.newUserNotificationEventsCount;if(p){p.toggle(!d._actionable&&o>0)}}var x=g.all(d._nextPageNode);var u=g.all(d._previousPageNode);var t=m.total;if(x){x.toggle(t>d._end)}if(u){u.toggle(d._start!=0)}var s=g.all(d._paginationInfoNode);var k=d._end<=t?d._end:t;var j=c.sub('\u004d\u006f\u0073\u0074\u0072\u0061\u006e\u0064\u006f\u0020\u0065\u006c\u0020\u0069\u006e\u0074\u0065\u0072\u0076\u0061\u006c\u006f\u0020\u007b\u0030\u007d\u0020\u002d\u0020\u007b\u0031\u007d\u0020\u0064\u0065\u0020\u007b\u0032\u007d\u0020\u0072\u0065\u0073\u0075\u006c\u0074\u0061\u0064\u006f\u0073\u002e',[(d._start+1),k,t]);if(s){if(l){s.setHTML(j)}s.toggle(l)}d._userNotificationEventIds=m.newUserNotificationEventIds;e.loadingmask.hide()}}}});Liferay.fire("updateNotificationsCount")},setActionable:function(e){var d=this;d._actionable=e},setNotificationsCount:function(e){var d=this;d._notificationsCount=e},setStart:function(e){var d=this;d._start=e;d._end=d._start+d._delta},_bindMarkAllAsRead:function(){var d=this;var e=a.one(d._notificationsContainer);var f=e.one(d._markAllAsReadNode);if(f){f.on("click",function(h){h.preventDefault();var g=new Liferay.PortletURL.createURL(d._baseActionURL);g.setParameter("javax.portlet.action","markAllAsRead");g.setParameter("userNotificationEventIds",d._userNotificationEventIds);g.setWindowState("normal");a.io.request(g.toString(),{after:{success:function(){var i=this.get("responseData");if(i.success){d.render()}}},dataType:"JSON"})})}},_bindMarkAsRead:function(){var d=this;var f=a.one(d._notificationsContainer);var e=f.one(d._notificationsNode);if(e){e.delegate("click",function(j){var k=j.currentTarget;var h=k.ancestor(".user-notification");h.plug(a.LoadingMask);h.loadingmask.show();var i=h.one(".user-notification-link");var g=i.attr("data-markAsReadURL");if(g){a.io.request(g,{after:{success:function(){var l=this.get("responseData");if(l.success){h.loadingmask.hide();d.render()}}},dataType:"JSON"})}},".user-notification .mark-as-read")}},_bindNextPageNotifications:function(){var d=this;var e=a.one(d._notificationsContainer);if(e){e.delegate("click",function(){d._start+=d._delta;d._end+=d._delta;d.render()},d._nextPageNode)}},_bindNotificationsAction:function(){var d=this;var f=a.one(d._notificationsContainer);var e=f.one(d._notificationsNode);if(e){e.delegate("click",function(h){h.preventDefault();var i=h.currentTarget;var g=i.ancestor(".user-notification");g.plug(a.LoadingMask);g.loadingmask.show();a.io.request(i.attr("href"),{after:{success:function(){var j=this.get("responseData");if(j.success){var k=i.ancestor(".user-notification-delete");if(k){a.io.request(k.getAttribute("data-deleteURL"),{after:{success:function(){d.render()}}})}}else{g.loadingmask.hide()}}},dataType:"JSON"})},".user-notification .btn-action")}},_bindPreviousPageNotifications:function(){var d=this;var e=a.one(d._notificationsContainer);if(e){e.delegate("click",function(){d._start-=d._delta;d._end-=d._delta;d.render()},d._previousPageNode)}},_bindUI:function(){var d=this;d._bindMarkAllAsRead();d._bindMarkAsRead();d._bindNotificationsAction();d._bindNextPageNotifications();d._bindPreviousPageNotifications();d._bindViewNotification()},_bindViewNotification:function(){var d=this;var f=a.one(d._notificationsContainer);var e=f.one(d._notificationsNode);if(e){e.delegate("click",function(i){var k=i.currentTarget;var j=i.target;if(j.hasClass(".mark-as-read")||j.ancestor(".mark-as-read")||(j._node.tagName=="A")){return}var h=k.attr("data-href");var g=k.attr("data-markAsReadURL");if(g){a.io.request(g,{after:{success:function(){var l=this.get("responseData");if(l.success){d._redirect(h)}}},dataType:"JSON"})}else{d._redirect(h)}},".user-notification .user-notification-link")}},_openWindow:function(d){return/p_p_state=(maximized|pop_up|exclusive)/.test(d)},_redirect:function(f){var d=this;if(f){if(d._openWindow(f)){Liferay.Util.openWindow({id:"notificationsWindow",uri:f})}else{var e=Liferay.Util.getTop();e.location.href=f}}}}});Liferay.NotificationsList=b},"",{requires:["aui-base","aui-io","aui-loading-mask-deprecated","liferay-poller","liferay-portlet-base","liferay-portlet-url"]});