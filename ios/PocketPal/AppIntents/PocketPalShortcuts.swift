//
//  PocketPalShortcuts.swift
//  PocketPal
//
//  App Shortcuts provider for PocketPal
//

import Foundation
import AppIntents

@available(iOS 16.0, *)
struct PocketPalShortcuts: AppShortcutsProvider {
    static var appShortcuts: [AppShortcut] {
        AppShortcut(
            intent: AskPalIntent(),
            phrases: [
                "Ask \(.applicationName)",
                "Ask \(.applicationName) AI",
                "Question for \(.applicationName)",
            ],
            shortTitle: "Ask TARS",
            systemImageName: "message.fill"
        )
        
        AppShortcut(
            intent: OpenPalChatIntent(),
            phrases: [
                "Open \(.applicationName) chat",
                "Chat with \(.applicationName)",
                "Start \(.applicationName) conversation",
            ],
            shortTitle: "Open Chat",
            systemImageName: "bubble.left.and.bubble.right.fill"
        )
    }
}

